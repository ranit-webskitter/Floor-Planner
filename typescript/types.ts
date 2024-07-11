

// export interface Room {
   
//     row: number;
//     column: number;
//     name: string;
//     code: any;
//     occupiedCells: number[];
//     cellData: CellData[];
//     id: string
//     employee_name:string
//     team_name:string
//     seat_number:string
//     room_name:string
//   }
  
//   export interface CellData {
//     index: number;
//     employeeName: string;
//     teamName: string;
//     seatNumber: number;
//     code:any;
//     roomNumber: number;
//     row:  number;
//     column:  number
//     name: string
//      employee_name: string;
//     room_name: string ,
//      seat_number: number ,
//      team_name: string,
     
//   }
//   export interface EmployeeAssignment{
//     employee_name: string;
//     team_name: string ,
//     room_name: string ,
//     seat_number: string ,

//     // roomNumber:string | number,
//     // seatNumber: string | number
//   }

//   export interface ViewEmployee{
//     celldata:CellData
//      roomNumber:number ,
//     seatNumber: string ,
//   }
//   export interface UpdateEmployeeAssesment{
//     employee_name: string,
//     team_name: string,
//     room_name: string,
//     seat_number: string,
//   }


// types.ts
// types.ts

// export interface Room {
//   row: number;
//   column: number;
//   name: string;
//   code: any;
//   occupiedCells: number[];
//   cellData: CellData[];
//   id: string;
//   employee_name: string;
//   team_name: string;
//   seat_number: string;
//   room_name: string;
// }

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

// export interface EmployeeAssignment {
//   employee_name: string;
//   team_name: string;
//   room_name: string;
//   seat_number: string;
// }

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
  id?: string; // Assuming 'id' is the unique identifier for a team in your database
  name?: string; // Assuming 'name' is a required field for a team
  members?: string[]; // Assuming 'members' is an array of strings representing team members
  employeeName?:string;
  teamName?:string;
  seatNumber?:number | string | null;
  roomId?:string
  roomName?:string
  
  // Add other fields as per your actual database schema
};
// Define a type specifically for editing an employee assignment
export type EditEmployeeAssignment = {
  id?: string; 
  employee_name: string;
  team_name: string;
  room_name: string;
  seat_number: string;
};
