const { Sequelize, DataTypes } = require('sequelize');
const res = require('express/lib/response');
const db = require('pg');

const sequelize = new Sequelize('pontos', 'postgres', 'postgres', {
  host: '10.0.0.3',
  port: '5432',
  dialect: 'postgres'
});

const Ponto = sequelize.define('ponto',{
  id:{
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
  },
  nome:{
      type: Sequelize.STRING,
      allowNull: false
  },
  geometria:{
      type: Sequelize.GEOMETRY,
      allowNull: false
  }
});


const addPonto = async (request, response) =>{

    const nome = request.body.nome;
    const geometria = {type: 'Point', coordinates:[request.body.lat, request.body.lng]}

    console.log(geometria);

    const ponto = Ponto.build({nome, geometria});
    ponto.save().then(()=>{
        response.status(200).send('Ponto salvo!');
    }).catch(err =>{
        console.log(err)
        response.status(400).send('Falha ao salvar');
    });

};

const sincronizar = async(request, response) =>{
    await Ponto.sync();
    response.status(200).send('Sincronizado');
}

const selecionar = async(request, response) =>{

  try {

    const project = await Ponto.findOne({ where: { nome: request.params.nome } })

    if ( ! project ) {
        return response.status(400).json({message: 'Major, esse PetShop não está cadastrado !'});
    }

    return response.status(200).json({coordinates: project.geometria.coordinates})

  } catch (err) {

    return response.status(400).json({error: err})

  }

}

module.exports = {addPonto, sincronizar, selecionar}