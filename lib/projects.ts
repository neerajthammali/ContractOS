import { supabase } from './supabaseClient';

export async function createProject(userId: string, name: string, data: object) {
  const { data: project, error } = await supabase
    .from('projects')
    .insert([{ user_id: userId, name, data }])
    .single();
  return { project, error };
}

export async function getProjects(userId: string) {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId);
  return { projects, error };
}

export async function updateProject(projectId: string, updates: object) {
  const { data: project, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', projectId)
    .single();
  return { project, error };
}

export async function deleteProject(projectId: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);
  return { error };
}
