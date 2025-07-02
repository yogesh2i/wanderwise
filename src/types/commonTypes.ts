export type Errors = {
    email?: string;
    password?: string;
    global?: string;
  };
  
export type FormState = {
    errors: Errors;
  };