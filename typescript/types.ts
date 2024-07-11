
export interface CellData {
  index?: number;
  employeeName?: string;
  teamName?: string;
  seatNumber?: number;
  code?: any;
  roomNumber?: number;
  row?: number;
  column?: number;
  name?: string;

  roomId?: string; // Add roomId property
  roomName?: string; //
  employee_name?:string;
  team_name?:string;
  seat_number?:number
  room_id?:string;
  room_name?:string
}



export interface CreateRoomData {
  name: string;
  code: any;
}

export interface UpdateRoomData {
  roomId: string; 
  updatedRoom: Room;
}

export interface FormSubmitData {
  employeeName: string;
  teamName: string;
  seatNumber: number;
  index: number;
}


export interface UpdateEmployeeAssesment{
  employee_name: string,
        team_name: string,
        room_name: string,
        seat_number: string,
        
}

// types.ts
export interface EmployeeAssignment {
  id: string;
  employee_name: string;
  team_name: string;
  room_name: string;
  seat_number: string;
}

export interface Room {
  id: string;
  name: string;
  code: string;
  row: number;
  column: number;
  cellData: CellData[];
  occupiedCells: number[];
}




export type Team = {
  id?: string; 
  name?: string; 
  members?: string[]; 
  employeeName?:string;
  teamName?:string;
  seatNumber?:number | string | null;
  roomId?:string
  roomName?:string
  
 
};
export type EditEmployeeAssignment = {
  id?: string; 
  employee_name: string;
  team_name: string;
  room_name: string;
  seat_number: string;
};
