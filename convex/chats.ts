import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

//v is like a reference oto the tables within the database

export const createChat = mutation({
  //it degfienes the expected arguments for the mutation
  args: {
    title: v.string(),
  },
  //The ctx parameter provides access to various utilities and services within the mutation handler:
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not Authenticated!!');
    }

    const chat = await ctx.db.insert('chats', {
      title: args.title,
      userId: identity.subject,
      createdAt: Date.now(),
    });
    return chat;
  },
});

export const deleteChat = mutation({
  args: { id: v.id('chats') },
  //bny context we can have access to the udnelying ayer like usrs andits' id
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not AuthneticateD!');
    }
    const chat = await ctx.db.get(args.id);
    if (!chat || chat.userId !== identity.subject) {
      throw new Error('Unauthorized!');
    }

    //Delete All messages in the chat!!!!
    const messages = await ctx.db
      .query('messages')
      .withIndex('by_chat', (q) => q.eq('chatId', args.id))
      .collect();
    for (const message of messages) {
      await ctx.db.delete(message._id);
    }
    await ctx.db.delete(args.id);
  },
});

export const listChat = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not Authorized!');
    }

    const chats = await ctx.db
      .query('chats')
      .withIndex('by_user', (q) => q['eq']('userId', identity.subject))
      .order('desc')
      .collect();

    return chats;
  },
});
