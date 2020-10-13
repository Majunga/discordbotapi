#!/usr/bin/env node
import { Command } from 'commander'
import { Discord } from './Discord'

// const login = 
//   new Command("login")
//     .requiredOption('-t, --token <token>', "Bot token")
//     .action(async (cmd:Command) => {
//       const discord = new Discord()
//       await discord.Login(cmd.token)
//       console.log('{ success: "Login successful" }')
//       process.exit()
//     })

// const guilds = 
//   new Command("guilds")
//     .requiredOption('-t, --token <token>', "Bot token")
//     .action(async (cmd:Command) => {
//       const discord = new Discord()
//       const guilds = await discord.Guilds(cmd.token)
//       console.log(guilds)
//       process.exit()
//     })

// new Command()
//   .addCommand(login)
//   .addCommand(guilds)
//   .parse(process.argv)