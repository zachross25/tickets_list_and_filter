export class TransferVariant {
  title: string;
  value: number;
  checked: boolean;

  constructor(title: string, value: number, checked: boolean) {
    this.title = title;
    this.value = value;
    this.checked = checked ? checked : false;
  }
}
