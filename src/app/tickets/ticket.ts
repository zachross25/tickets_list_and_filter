export class Ticket {
  constructor(
    public origin: string,
    public origin_name: string,
    public destination: string,
    public destination_name: string,
    public departure_date: string,
    public departure_time: string,
    public arrival_time: string,
    public arrival_date: string,
    public carrier: string,
    public stops: number,
    public price: number,
  ) {}
}
