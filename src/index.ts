import { Telegraf ,Markup} from 'telegraf';

const bot = new Telegraf('7909433129:AAHRvIz0iqsxmZGeVNiBvEYTCFemnkNjPQ4');


bot.start((ctx) => {
   ctx.reply(
      '👋 Добро пожаловать! Нажми кнопку ниже, чтобы начать 👇',
      Markup.inlineKeyboard([
      Markup.button.callback('🚀 Начать', 'start_quote')
   ])
   );
});
// /start
bot.start((ctx) => {
   ctx.reply('Привет! Я Мотиватор 💡 Напиши /quote или /help — и получишь вдохновение!');
});

// /help
bot.command('help', (ctx) => {
   ctx.reply(`
Бот умеет:

✅ Отправлять вдохновляющие цитаты (/quote)
🌍 Приветствовать на разных языках:
- привет — русский
- hello — английский
- hola — испанский
`);
});

// /quote
bot.command('quote', async (ctx) => {
try {
   const res = await fetch('https://zenquotes.io/api/random');
   const data = await res.json();
   const quote = data[0];
   ctx.reply(`✨ ${quote.q}\n— ${quote.a}`);
} catch (err) {
   console.error(err);
   ctx.reply('Не получилось получить цитату. Попробуй позже 🙁');
}
});

// Приветствия
bot.hears('привет', (ctx) => ctx.reply('Привет бахтибегими! 🌟'));
bot.hears('hello', (ctx) => ctx.reply('Hello there! 👋'));
bot.hears('hola', (ctx) => ctx.reply('¡Hola amigo! 🌞'));

// Всё остальное
bot.on('text', (ctx) => {
   const msg = ctx.update.message.text.toLowerCase();
   if (!['привет', 'hello', 'hola'].includes(msg)) {
   ctx.reply(`Приветствие "${msg}" не поддерживается. Напиши /help чтобы узнать, что я умею.`);
   }
});
bot.action('start_quote', async (ctx) => {
   await ctx.answerCbQuery(); // Убираем "часики" после нажатия
   ctx.reply('Я Мотиватор! Напиши /quote — и получишь вдохновение ✨');
   });
bot.launch();
console.log('✅ Бот запущен...');
