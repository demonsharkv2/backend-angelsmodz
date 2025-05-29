const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Registrar
router.post('/register', async (req, res) => {
  try {
    const { numero, nome, senha } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new Usuario({ numero, nome, senha: senhaHash });
    await novoUsuario.save();
    res.status(201).json({ mensagem: 'Usuário registrado com sucesso!' });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao registrar usuário.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { numero, senha } = req.body;
    const usuario = await Usuario.findOne({ numero });
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ erro: 'Senha incorreta' });

    res.status(200).json({ mensagem: 'Login bem-sucedido', usuario: { nome: usuario.nome, numero: usuario.numero } });
  } catch (err) {
    res.status(500).json({ erro: 'Erro no login' });
  }
});

module.exports = router;
