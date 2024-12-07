const {perfilDto} = require('../dto/perfilDto.js')

class PerfilRepository {
    constructor(dao){
        this.dao = dao
    }

    getPerfil = async(usuario) =>{
        const perfil = await this.dao.getByUser(usuario)
        return new perfilDto(perfil)
    }
    

}
module.exports = {PerfilRepository}