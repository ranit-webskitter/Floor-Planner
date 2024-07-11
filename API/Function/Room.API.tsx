
import { createClient } from '@supabase/supabase-js';
import { Room } from '../../typescript/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchRooms = async () => {
  const { data, error } = await supabase.from('rooms').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const fetchRoomById = async (roomId: string) => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', roomId)
    .single(); 
  if (error) throw new Error(error.message);
  return data;
};

export const updateRoom = async (updatedRoom:Room) => {
  const { data, error } = await supabase
    .from('rooms')
    .update(updatedRoom)
    .eq('id', updatedRoom.id); 
  if (error) throw new Error(error.message);
  return data;
};

export const deleteRoom = async (roomId: string) => {
  const { data, error } = await supabase
    .from('rooms')
    .delete()
    .eq('id', roomId); 
  if (error) throw new Error(error.message);
  return data;
};

export const createRoom = async (newRoom: Room) => {
  const { data, error } = await supabase.from('rooms').insert(newRoom);
  if (error) throw new Error(error.message);
  return data;
};

