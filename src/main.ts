import { Command } from 'commander'
import { Client } from 'discord.js'
import { Check } from './Check'

const login = new Command("login")
                .option('-t, --token', "Bot token")

                .action((opts) => {
                  Check.checkIsDefined(opts, 'token is defined')

                  const client = new Client()

                  client.login(opts.token)
                })


new Command()
  .addCommand(login)
  .parse(process.argv)