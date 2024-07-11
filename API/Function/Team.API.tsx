// import { createClient } from "@supabase/supabase-js";
// import { Room } from "../../typescript/types";


// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
// const supabase = createClient(supabaseUrl, supabaseKey);
// export const fetchTeams = async () => {
//   const { data, error } = await supabase.from('Team').select('*');
//   if (error) {
//     throw new Error(error.message);
//   }
//   return data || [];
// };

// export const createTeam = async (newTeam: any) => {
//   const { data, error } = await supabase.from('Team').insert(newTeam);
//   if (error) {
//     throw new Error(error.message);
//   }
//   return data;
// };

// export const updateTeam = async (updatedEmp: Room) => {
//    const members = await fetchTeamMembers(updatedEmp.team_name);
//    const updatedMembers = {...members, updatedEmp};
//   const { data, error } = await supabase.from('Team').update({ members: updatedMembers }).eq('name', updatedEmp.team_name);
//   if (error) {
//     throw new Error(error.message);
//   }
//   return data;
// };



// export const deleteTeam = async (teamId: string) => {
//   const { error } = await supabase.from('Team').delete().eq('id', teamId);
//   if (error) {
//     throw new Error(error.message);
//   }
// };




// export const fetchTeamMembers = async (teamName: string): Promise<string[]> => {
//   const { data, error } = await supabase
//     .from('Team')
//     .select('members')
//     .eq('name', teamName)
//     .single();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data?.members || [];
// };
import { createClient } from "@supabase/supabase-js";
import { Team } from "../../typescript/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchTeams = async () => {
  const { data, error } = await supabase.from('Team').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};

export const createTeam = async (newTeam: any) => {
  const { data, error } = await supabase.from('Team').insert(newTeam);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const updateTeam = async (updatedTeam: Team) => {
  if (!updatedTeam.name) {
    throw new Error("Team name must be provided for updating team members.");
  }

  const currentMembers = await fetchTeamMembers(updatedTeam.name);
  const updatedMembers = { ...currentMembers, ...updatedTeam.members };

  const { data, error } = await supabase.from('Team').update({ members: updatedMembers }).eq('name', updatedTeam.name);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const deleteTeam = async (teamId: string) => {
  const { error } = await supabase.from('Team').delete().eq('id', teamId);
  if (error) {
    throw new Error(error.message);
  }
};

export const fetchTeamMembers = async (teamName: string): Promise<string[]> => {
  if (!teamName) {
    throw new Error("Team name must be provided to fetch team members.");
  }

  const { data, error } = await supabase
    .from('Team')
    .select('members')
    .eq('name', teamName)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data?.members || [];
};
