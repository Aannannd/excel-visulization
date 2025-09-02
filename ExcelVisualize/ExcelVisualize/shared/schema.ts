import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("analyst"), // analyst, manager, admin
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  size: integer("size").notNull(),
  mimeType: text("mime_type").notNull(),
  columns: jsonb("columns").$type<string[]>().notNull(),
  rowCount: integer("row_count").notNull(),
  data: jsonb("data").$type<Record<string, any>[]>().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const charts = pgTable("charts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  fileId: integer("file_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  chartType: text("chart_type").notNull(), // line, bar, pie, scatter, 3d
  xAxis: text("x_axis").notNull(),
  yAxis: text("y_axis").notNull(),
  config: jsonb("config").$type<Record<string, any>>().notNull(),
  is3D: boolean("is_3d").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertFileSchema = createInsertSchema(files).omit({
  id: true,
  createdAt: true,
});

export const insertChartSchema = createInsertSchema(charts).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFile = z.infer<typeof insertFileSchema>;
export type File = typeof files.$inferSelect;
export type InsertChart = z.infer<typeof insertChartSchema>;
export type Chart = typeof charts.$inferSelect;
