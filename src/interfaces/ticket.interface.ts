export interface ITicket {
  sec: number;
  row: string;
  seat: number;
  type: string; // Use EEventTicketType if you want strict typing
}

export interface ITicketDocument extends Document, ITicket {}
