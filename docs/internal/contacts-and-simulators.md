# Contacts & Simulators / Emulators

The default iOS simulator comes with a handful of placeholder contacts out of the box. On Android, a fresh emulator has 0 contacts. Here are the steps to generate and import more contacts into your Simulator and/or emulator to have a larger dataset to work with for your app testing.

## Generating Contacts

This repo has a helpful script to generate contacts in the vCard format that you then can import.

The script is located in `./scripts/generate/vcard.mjs`. You can optionally modify this script as necessary to produce contacts with the details you need. You can use the [faker utility](https://fakerjs.dev/api/) to help with the data. Refer to the [vCard spec](https://www.rfc-editor.org/rfc/rfc6350.html) for syntax.

To generate the vCard file, run:

```bash
yarn generate:vcard # generates 60 contacts

# or, pass the number of contacts to generate:

yarn generate:vcard 10 # generates 10 contacts
```

## (iOS) Import Into Simulator

1. Open the "Contacts" app.
2. Drag & drop the generated `.tmp/contacts.vcf` file onto device.
3. When prompted, press "Add All Contacts".
4. When prompted, press "Create New Contacts".

<video src="https://github.com/infinitered/ReactNativeEssentials/assets/1775841/21836320-2a9d-4ef3-9c27-ca605fe0b1d6" ></video>

## (Android) Import Into Emulator

1. Open the "Contacts" app.
2. Press "Fix & Manage" (this may be called something else depending on your falvor of emulator).
3. Press "Import from File".
4. Drag & drop the generated `.tmp/contacts.vcf` file onto device.
5. Press on the added `.tmp/contacts.vcf` file.

<video src="https://github.com/infinitered/ReactNativeEssentials/assets/1775841/aff9b8be-25fd-4994-9cb6-3a77363610b5" /></video>
