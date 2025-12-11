import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface OptionType {
  value: string;
  label: string;
}

export interface ISelect {
  options: OptionType[];
  placeholder?: string;
  label: string;
  className?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  register: any;
  id: string;
  value?: string;
}
