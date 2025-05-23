import { NlpManager } from "node-nlp";

const manager = new NlpManager({ languages: ["pt"], forceNER: true });

export default trainModel = async () => {
  manager.addDocument("pt", "Olá cronus", "greetings");
  manager.addDocument("pt", "Obrigado", "thanks");
  manager.addDocument("pt", "hora", "show.time");
  manager.addDocument("pt", "temperatura", "show.wether");
  manager.addDocument("pt", "toca música", "play.music");
  manager.addDocument("pt", "outra música", "play.music");
  manager.addDocument("pt", "desligue música", "stop.music");
  manager.addDocument("pt", "anedota piada", "tell.joke");
  manager.addDocument("pt", "Envia mensagem", "send.msg");
  manager.addDocument("pt", "Encontra tecnico", "find.technician");
  manager.addDocument("pt", "Encontra casa de renda", "rent.house");

  manager.addAnswer("pt", "greetings", "");
  manager.addAnswer("pt", "thanks", "De nada.");
  manager.addAnswer("pt", "show.time", "");
  manager.addAnswer("pt", "show.wether", "");
  manager.addAnswer("pt", "play.music", "");
  manager.addAnswer("pt", "stop.music", "");
  manager.addAnswer("pt", "tell.joke", "");
  manager.addAnswer("pt", "send.msg", "");
  manager.addAnswer("pt", "find.technician", "");
  manager.addDocument("pt", "rent.house", "");

  try {
    await manager.train();
    manager.save("./src/node-nlp-models/cronus.nlp");
    console.log("Model trained and saved successfully!");
  } catch (err) {
    console.log(err);
  }
};
