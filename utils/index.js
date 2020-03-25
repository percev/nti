import localForage from 'localforage'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const GENERATE_TEXT_LIMIT = 10000
const STORE_LENGTH = 10000000

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
  return [str[0], str]
}

function* generateText () {
  for (let i = 0; i < GENERATE_TEXT_LIMIT; i++) {
    yield [...generateString()]
  }
}

async function checkStorage () {
  let length = 0
  await localForage.iterate(function(value) {
    length += value.length
  }).catch(function(err) {
    console.log(err)
  });
  return length
}

async function clearStorage () {
  return await localForage.clear().then(function() {
    console.log('Database is now empty.');
  }).catch(function(err) {
    console.log(err)
  });
}

function dublicateStore () {
  localForage.iterate( function(value, key) {
    if (value.length < 135000) {
      value.push(...value)
      localForage.setItem(key, value)
    }
  }).catch(function(err) {
    console.log(err)
  });
}

export async function generateStorage () {
  try {
    let storeLength = await checkStorage()
    if (storeLength < STORE_LENGTH) {
      for (let value of generateText()) {
        const item = await localForage.getItem(value[0])
        if (item) {
          item.push(value[1])
          await localForage.setItem(value[0],item)
        } else {
          await localForage.setItem(value[0], [value[1]])
        }
      }

      while (storeLength < STORE_LENGTH) {
        dublicateStore()
        storeLength = await checkStorage()
        console.log('storeLength', storeLength)
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export async function getStorage() {
  const storage = {}
  return await localForage.iterate(function(value, key) {
    storage[key] = value.sort()
  }).then(function() {
    return storage
  }).catch(function(err) {
    console.log(err)
  });
}

export function linearSearch (list, str) {
  return Array.isArray(list) && list.length > 0 ? list.filter(el =>  el.indexOf(str) === 0).length : 0
}
