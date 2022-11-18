export interface Titular{

    nroAfiliado:number,
    dni:number,
    nroEmpresa:number,
    apellido:string,
    nombre:string,
    fechaNacimiento: Date,
    foto:string,
    fotoMostrar?:string,
    estado:boolean,
    empresa?:Empresa

  }

  export interface Familiar{
    dni:number,
    apellido:string,
    nombre:string,
    fechaNacimiento:Date,
    parentesco:string,
    nroAfiliado:number,
    foto:string,
    fotoMostrar?:string,
    estado:boolean,
    fotoCarnet?:any
    
  }

  export interface Empresa{

    nroEmpresa:number,
    razonSocial:string,
    estado:boolean

  }

  export interface Usuario{

    id?:number,
    apellido?:string,
    nombre?:string,
    email?:string,
    password?:string

  }