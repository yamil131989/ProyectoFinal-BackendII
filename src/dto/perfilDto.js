class PerfilDto {
    constructor(usuario){
        this._id = usuario._id,
        this.fullname = `${usuario.first_name} ${usuar.last_name}`,
        this.email = usuario.email,
        this.role = usuario.role,
        this.creado = usuario.atCreated
    }
}

module.exports = {PerfilDto}