import localForage from 'localforage'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const STORE_LENGTH = 1000

function randomCharCode () {
  const minChar = 0
  const maxChar = 52
  return ALPHABET[Math.floor(Math.random() * (maxChar - minChar + 1)) + minChar]
}

function generateString () {
  let str = ''
  for (let i = 0; i < 100; i++) {
    str += randomCharCode()
  }
  return str
}

function* generateText () {
  for (let i = 0; i < STORE_LENGTH; i++) {
    yield [String(i), generateString()]
  }
}

async function checkStorage () {
  return await localForage.length().then(function(numberOfKeys) {
    return numberOfKeys
  }).catch(function(err) {
    console.log(err)
  });
}

async function clearStorage () {
  return await localForage.clear().then(function() {
    console.log('Database is now empty.');
  }).catch(function(err) {
    console.log(err)
  });
}

export async function generateStorage () {
  try {
    const storeLength = await checkStorage()
    if (storeLength < STORE_LENGTH) {
      await clearStorage()
      for (let value of generateText()) {
        await localForage.setItem(value[0], value[1])
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export async function getStorage() {
  const storage = []
  return await localForage.iterate(function(value) {
    storage.push(value)
  }).then(function() {
    return storage
  }).catch(function(err) {
    console.log(err)
  });
}
