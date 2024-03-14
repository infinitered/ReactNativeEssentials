#!/usr/bin/env node --experimental-network-imports

import { Buffer } from 'buffer'
import { mkdir, writeFile } from 'fs/promises'
import { faker } from 'https://cdn.jsdelivr.net/npm/@faker-js/faker@v8.4.1/+esm'
import fetch from 'node-fetch'

const args = process.argv.slice(2)

const numOfContacts = Number(args[0] || 60)

let avatars = []

await Promise.all(
  Array.from({ length: 27 }, (_, i) => i + 1).map(async i => {
    const response = await fetch(
      `https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_${i}.png`,
    )
    const buffer = await response.buffer()
    const base64 = Buffer.from(buffer).toString('base64')
    avatars.push(base64)
  }),
)

let vcardItems = []

for (let i = 0; i < numOfContacts; i++) {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const birthDate = faker.date.birthdate()
  const email = faker.internet.email({ firstName, lastName })
  const mainNum = faker.helpers.fromRegExp('[1-9]{3}-[1-9]{3}-[1-9]{4}')
  const cellNum = faker.helpers.fromRegExp('[1-9]{3}-[1-9]{3}-[1-9]{4}')
  const avatar = avatars[i % avatars.length]
  const year = birthDate.getFullYear()
  const month = birthDate.getMonth() + 1
  const day = birthDate.getDate()
  const company = faker.company.name()
  const jobTitle = faker.person.jobTitle()
  const note = faker.lorem.sentence()

  const vcard = `
BEGIN:VCARD
VERSION:3.0
REV:1999-01-01T00:00:00Z
N:${lastName};${firstName};;;
EMAIL;HOME:${email}
FN:${firstName} ${lastName}
BDAY:${year}-${month}-${day}
ORG:${company}
TITLE:${jobTitle}
NOTE:${note}
TEL;PREF:${mainNum}
TEL;CELL:${cellNum}${avatar ? `\nPHOTO;ENCODING=BASE64;PNG:${avatar}` : ''}
END:VCARD`

  vcardItems.push(vcard)
}
await mkdir('.tmp', { recursive: true })
await writeFile('.tmp/contacts.vcf', vcardItems.join('\n'))
