export interface Titular{

    nroAfiliado:number,
    dni:number,
    nroEmpresa:number,
    apellido:string,
    nombre:string,
    fechaNacimiento: Date,
    foto:string

  }

  export interface Familiar{
    dni:number,
    apellido:string,
    nombre:string,
    fechaNacimiento:Date,
    parentesco:string,
    nroAfiliado:number,
    foto:string,
    
  }

  export interface Empresa{

    nroEmpresa:number,
    razonSocial:string

  }

  export interface Usuario{

    id?:number,
    apellido?:string,
    nombre?:string,
    email?:string,
    password?:string

  }