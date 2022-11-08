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