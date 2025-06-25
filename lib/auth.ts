import { supabase } from './supabaseClient';

export const signInWithEmail = async (email: string, password: string) => {
  const { user, session, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user, session, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
