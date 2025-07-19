#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk').default;
const inquirer = require('inquirer').default;
const ora = require('ora');
const Conf = require('conf').default;
const updateNotifier = require('update-notifier').default;
const figlet = require('figlet');
const boxen = require('boxen').default;

// Import the tunnel client
const TunnelClient = require('./client/index.js');

// Initialize configuration store
const config = new Conf({
  projectName: 'tunnel-client',
  defaults: {
    serverUrl: 'ws://localhost:8080',
    localPort: 3000,
    localHost: 'localhost',
    clientId: 'default-client',
    reconnectInterval: 5000,
    maxReconnectAttempts: 10
  }
});

// Check for updates
updateNotifier({ pkg: require('./package.json') }).notify();

const program = new Command();

// ASCII art banner
const banner = figlet.textSync('TUNNEL', {
  font: 'Standard',
  horizontalLayout: 'default',
  verticalLayout: 'default'
});

console.log(boxen(chalk.cyan(banner), {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'cyan'
}));

// Show author information
console.log(chalk.gray('By Latiful Mousom (@lmousom)'));
console.log('');

program
  .name('tunnel')
  .description('A modern CLI tool for tunnel client management')
  .version('1.0.0');

// Global options
program
  .option('-v, --verbose', 'Enable verbose logging')
  .option('-q, --quiet', 'Suppress all output except errors');

// Connect command
program
  .command('connect')
  .description('Connect to tunnel server')
  .option('-s, --server <url>', 'Tunnel server URL', config.get('serverUrl'))
  .option('-p, --port <number>', 'Local port to tunnel', config.get('localPort'))
  .option('-h, --host <host>', 'Local host to tunnel', config.get('localHost'))
  .option('-c, --client-id <id>', 'Client identifier', config.get('clientId'))
  .option('-r, --reconnect-interval <ms>', 'Reconnect interval in ms', config.get('reconnectInterval'))
  .option('-m, --max-reconnect <number>', 'Maximum reconnect attempts', config.get('maxReconnectAttempts'))
  .action(async (options) => {
    const spinner = ora('Connecting to tunnel server...').start();
    
    try {
      // Save configuration
      config.set('serverUrl', options.server);
      config.set('localPort', parseInt(options.port));
      config.set('localHost', options.host);
      config.set('clientId', options.clientId);
      config.set('reconnectInterval', parseInt(options.reconnectInterval));
      config.set('maxReconnectAttempts', parseInt(options.maxReconnectAttempts));

      const client = new TunnelClient({
        serverUrl: options.server,
        localPort: parseInt(options.port),
        localHost: options.host,
        clientId: options.clientId,
        reconnectInterval: parseInt(options.reconnectInterval),
        maxReconnectAttempts: parseInt(options.maxReconnectAttempts)
      });

      client.connect();

      // Handle graceful shutdown
      process.on('SIGINT', () => {
        spinner.stop();
        console.log(chalk.yellow('\nDisconnecting from tunnel server...'));
        client.disconnect();
        process.exit(0);
      });

      process.on('SIGTERM', () => {
        spinner.stop();
        console.log(chalk.yellow('\nDisconnecting from tunnel server...'));
        client.disconnect();
        process.exit(0);
      });

    } catch (error) {
      spinner.fail(chalk.red('Failed to connect'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

// Interactive setup command
program
  .command('setup')
  .description('Interactive setup wizard')
  .action(async () => {
    console.log(chalk.cyan('\n🚀 Tunnel Client Setup Wizard\n'));

    const questions = [
      {
        type: 'input',
        name: 'serverUrl',
        message: 'Tunnel server URL:',
        default: config.get('serverUrl'),
        validate: (input) => {
          if (!input) return 'Server URL is required';
          if (!input.startsWith('ws://') && !input.startsWith('wss://')) {
            return 'URL must start with ws:// or wss://';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'localPort',
        message: 'Local port to tunnel:',
        default: config.get('localPort').toString(),
        validate: (input) => {
          const port = parseInt(input);
          if (isNaN(port) || port < 1 || port > 65535) {
            return 'Port must be a number between 1 and 65535';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'localHost',
        message: 'Local host to tunnel:',
        default: config.get('localHost'),
        validate: (input) => {
          if (!input) return 'Host is required';
          return true;
        }
      },
      {
        type: 'input',
        name: 'clientId',
        message: 'Client identifier:',
        default: config.get('clientId'),
        validate: (input) => {
          if (!input) return 'Client ID is required';
          if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
            return 'Client ID can only contain letters, numbers, hyphens, and underscores';
          }
          return true;
        }
      },
      {
        type: 'confirm',
        name: 'saveConfig',
        message: 'Save this configuration for future use?',
        default: true
      }
    ];

    try {
      const answers = await inquirer.prompt(questions);

      if (answers.saveConfig) {
        config.set('serverUrl', answers.serverUrl);
        config.set('localPort', parseInt(answers.localPort));
        config.set('localHost', answers.localHost);
        config.set('clientId', answers.clientId);

        console.log(chalk.green('\n✅ Configuration saved successfully!'));
      }

      console.log(chalk.cyan('\n📋 Configuration Summary:'));
      console.log(chalk.white(`Server URL: ${chalk.cyan(answers.serverUrl)}`));
      console.log(chalk.white(`Local Port: ${chalk.cyan(answers.localPort)}`));
      console.log(chalk.white(`Local Host: ${chalk.cyan(answers.localHost)}`));
      console.log(chalk.white(`Client ID: ${chalk.cyan(answers.clientId)}`));

      const { startNow } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'startNow',
          message: 'Start tunnel connection now?',
          default: true
        }
      ]);

      if (startNow) {
        console.log(chalk.cyan('\n🔗 Starting tunnel connection...'));
        
        const client = new TunnelClient({
          serverUrl: answers.serverUrl,
          localPort: parseInt(answers.localPort),
          localHost: answers.localHost,
          clientId: answers.clientId
        });

        client.connect();

        // Handle graceful shutdown
        process.on('SIGINT', () => {
          console.log(chalk.yellow('\nDisconnecting from tunnel server...'));
          client.disconnect();
          process.exit(0);
        });
      }

    } catch (error) {
      console.error(chalk.red('Setup failed:'), error.message);
      process.exit(1);
    }
  });

// Configuration management commands
program
  .command('config')
  .description('Manage configuration')
  .option('-s, --show', 'Show current configuration')
  .option('-r, --reset', 'Reset to default configuration')
  .option('-e, --edit', 'Edit configuration interactively')
  .action(async (options) => {
    if (options.show) {
      console.log(chalk.cyan('\n📋 Current Configuration:'));
      console.log(chalk.white(`Server URL: ${chalk.cyan(config.get('serverUrl'))}`));
      console.log(chalk.white(`Local Port: ${chalk.cyan(config.get('localPort'))}`));
      console.log(chalk.white(`Local Host: ${chalk.cyan(config.get('localHost'))}`));
      console.log(chalk.white(`Client ID: ${chalk.cyan(config.get('clientId'))}`));
      console.log(chalk.white(`Reconnect Interval: ${chalk.cyan(config.get('reconnectInterval'))}ms`));
      console.log(chalk.white(`Max Reconnect Attempts: ${chalk.cyan(config.get('maxReconnectAttempts'))}`));
    } else if (options.reset) {
      config.clear();
      console.log(chalk.green('✅ Configuration reset to defaults'));
    } else if (options.edit) {
      // Interactive configuration editing
      const questions = [
        {
          type: 'list',
          name: 'configKey',
          message: 'Select configuration to edit:',
          choices: [
            { name: 'Server URL', value: 'serverUrl' },
            { name: 'Local Port', value: 'localPort' },
            { name: 'Local Host', value: 'localHost' },
            { name: 'Client ID', value: 'clientId' },
            { name: 'Reconnect Interval', value: 'reconnectInterval' },
            { name: 'Max Reconnect Attempts', value: 'maxReconnectAttempts' }
          ]
        }
      ];

      const { configKey } = await inquirer.prompt(questions);
      const currentValue = config.get(configKey);

      const { newValue } = await inquirer.prompt([
        {
          type: 'input',
          name: 'newValue',
          message: `Enter new value for ${configKey}:`,
          default: currentValue.toString()
        }
      ]);

      config.set(configKey, newValue);
      console.log(chalk.green(`✅ ${configKey} updated successfully`));
    } else {
      // Show help for config command
      program.commands.find(cmd => cmd.name() === 'config').help();
    }
  });

// Status command
program
  .command('status')
  .description('Show tunnel status and information')
  .action(() => {
    console.log(chalk.cyan('\n📊 Tunnel Status'));
    console.log(chalk.white('Configuration:'));
    console.log(chalk.gray(`  Server URL: ${config.get('serverUrl')}`));
    console.log(chalk.gray(`  Local Port: ${config.get('localPort')}`));
    console.log(chalk.gray(`  Local Host: ${config.get('localHost')}`));
    console.log(chalk.gray(`  Client ID: ${config.get('clientId')}`));
    
    console.log(chalk.white('\nUsage:'));
    console.log(chalk.gray('  tunnel connect          - Connect to tunnel server'));
    console.log(chalk.gray('  tunnel setup            - Interactive setup wizard'));
    console.log(chalk.gray('  tunnel config --show    - Show configuration'));
    console.log(chalk.gray('  tunnel status           - Show this information'));
    
    console.log(chalk.white('\nAuthor:'));
    console.log(chalk.gray('  Latiful Mousom (@lmousom)'));
    console.log(chalk.gray('  https://github.com/lmousom/tunnel-server'));
  });

// Quick connect command
program
  .command('quick')
  .description('Quick connect with minimal options')
  .option('-p, --port <number>', 'Local port to tunnel', '3000')
  .option('-c, --client-id <id>', 'Client identifier', 'quick-client')
  .action(async (options) => {
    const spinner = ora('Quick connecting to tunnel...').start();
    
    try {
      const client = new TunnelClient({
        serverUrl: config.get('serverUrl'),
        localPort: parseInt(options.port),
        localHost: config.get('localHost'),
        clientId: options.clientId
      });

      client.connect();
      spinner.succeed(chalk.green('Quick tunnel connected!'));

      // Handle graceful shutdown
      process.on('SIGINT', () => {
        spinner.stop();
        console.log(chalk.yellow('\nDisconnecting...'));
        client.disconnect();
        process.exit(0);
      });

    } catch (error) {
      spinner.fail(chalk.red('Quick connect failed'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

// Help command enhancement
program
  .command('help')
  .description('Show detailed help information')
  .action(() => {
    console.log(chalk.cyan('\n🔧 Tunnel Client Help\n'));
    console.log(chalk.white('Commands:'));
    console.log(chalk.cyan('  connect') + chalk.gray('     - Connect to tunnel server with options'));
    console.log(chalk.cyan('  setup') + chalk.gray('       - Interactive setup wizard'));
    console.log(chalk.cyan('  config') + chalk.gray('      - Manage configuration'));
    console.log(chalk.cyan('  status') + chalk.gray('      - Show tunnel status'));
    console.log(chalk.cyan('  quick') + chalk.gray('       - Quick connect with minimal options'));
    console.log(chalk.cyan('  help') + chalk.gray('        - Show this help information\n'));
    
    console.log(chalk.white('Examples:'));
    console.log(chalk.gray('  tunnel setup                    # Interactive setup'));
    console.log(chalk.gray('  tunnel connect -p 3000          # Connect on port 3000'));
    console.log(chalk.gray('  tunnel quick -p 8080            # Quick connect on port 8080'));
    console.log(chalk.gray('  tunnel config --show            # Show configuration'));
    console.log(chalk.gray('  tunnel config --reset           # Reset configuration\n'));
    
    console.log(chalk.white('For more information, visit:'));
    console.log(chalk.cyan('  https://github.com/lmousom/tunnel-server'));
    console.log(chalk.white('Author:'));
    console.log(chalk.cyan('  Latiful Mousom (@lmousom)'));
  });

// Parse command line arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.help();
} 