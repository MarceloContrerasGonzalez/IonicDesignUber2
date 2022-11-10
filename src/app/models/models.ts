export interface usuariosI{
    nombre: string;
    username: string;
    password: string;
    viajeID: string;
}

export interface ViajesI{
    //id: number;
    Userid: string;
    pasajeros: number;
    maxPasajeros: number;
    tarifa: number;
    destino: string;
    patente: string;
    informacion: string;
    estado: number;
}