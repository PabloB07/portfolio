import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

// Tabla de usuarios (complementa auth.users de Supabase)
export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // Coincide con auth.users.id
  email: text('email').notNull().unique(),
  fullName: text('full_name'),
  avatar: text('avatar'),
  role: text('role').default('user'), // 'admin', 'user'
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Tabla de perfiles de usuario
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  bio: text('bio'),
  website: text('website'),
  location: text('location'),
  skills: text('skills').array(),
  socialLinks: text('social_links'), // JSON string
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  technologies: text('technologies').array().notNull(),
  image: text('image').notNull(),
  github: text('github'),
  demo: text('demo'),
  featured: boolean('featured').default(false),
  published: boolean('published').default(true),
  authorId: uuid('author_id').references(() => users.id), // Nuevo campo
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  author: text('author').notNull(),
  authorId: uuid('author_id').references(() => users.id), // Nuevo campo
  publishedAt: timestamp('published_at').defaultNow(),
  tags: text('tags').array().notNull(),
  featured: boolean('featured').default(false),
  published: boolean('published').default(true),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Tabla de sesiones de usuario
export const userSessions = pgTable('user_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  sessionToken: text('session_token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});