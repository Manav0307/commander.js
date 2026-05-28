const commander = require('../');

test('when help subcommand then preSubcommand runs before delegated help', () => {
  const calls = [];
  const program = new commander.Command();
  program.hook('preSubcommand', (thisCommand, subCommand) => {
    calls.push('preSubcommand');
    calls.push(subCommand.name());
  });
  const sub = program.command('sub');
  sub.help = () => {
    calls.push('help');
    throw new Error('sub help');
  };

  expect(() => {
    program.parse(['help', 'sub'], { from: 'user' });
  }).toThrow('sub help');

  expect(calls).toEqual(['preSubcommand', 'sub', 'help']);
});

test('when help subcommand then reset state before preSubcommand hook on repeated parse', () => {
  const states = [];
  const program = new commander.Command();
  const subcommand = program.command('sub').option('--red');
  subcommand.help = () => {
    throw new Error('sub help');
  };
  program.hook('preSubcommand', (thisCommand, subCommand) => {
    states.push(subCommand.opts());
  });

  for (let i = 0; i < 2; i += 1) {
    try {
      program.parse(['help', 'sub'], { from: 'user' });
    } catch (err) {
      expect(err.message).toBe('sub help');
    }
  }

  expect(states).toEqual([{}, {}]);
  expect(subcommand.opts()).toEqual({});
});
