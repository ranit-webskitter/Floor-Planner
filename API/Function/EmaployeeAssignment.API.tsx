import { createClient } from '@supabase/supabase-js';
import { CellData, EditEmployeeAssignment, Room } from '../../typescript/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const createEmployeeAssignment = async (assignment: CellData) => {
    const { data, error } = await supabase
      .from('employee_assignments')
      .insert([assignment]);
  
    if (error) throw error;
    return data;
  };
  
  export const fetchEmployeeAssignments = async () => {
    const { data, error } = await supabase
      .from('employee_assignments')
      .select('*');
  
    if (error) throw error;
    return data;
  };

  export const deleteEmployeeAssignments = async (employeeId: string) => {
    const { data, error } = await supabase
      .from('employee_assignments')
      .delete()
      .eq('id', employeeId); 
    if (error) throw new Error(error.message);
    return data;
  };
  
  export const updateEmployeeAssignment = async (updatedEmp: EditEmployeeAssignment) => {
    const { data, error } = await supabase
      .from('employee_assignments')
      .update(updatedEmp)
      .eq('id', updatedEmp?.id); 
    if (error) throw new Error(error.message);
    return data;
  };


  export const fetchEmployeeById = async (empId: string) => {
    const { data, error } = await supabase
      .from('employee_assignments')
      .select('*')
      .eq('id', empId)
      .single(); 
    if (error) throw new Error(error.message);
    return data;
  };

