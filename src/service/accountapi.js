//This is localstorage as a substitute of DB.

const getIDArray = () => {
  let accounts = JSON.parse(localStorage.getItem('accounts'))
  if(accounts === null)
    return []

  return accounts
    .map(
      (el) => {
        return el.id
      }
    )
}

const asyncLocalStorage = {
  setItem: function (key, value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, JSON.stringify(value))
    })
  },
  getItem: function (key) {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem(key))
    })
  }
}

//This accountSetting is for event submitRegister
const makeAccount = (accountSetting) => {
  let accounts = asyncLocalStorage.getItem('accounts')

  return new Promise((resolve, reject) => {
    accounts
      .then(
        (value => {
          value === null ? value = [] : {}
          value.push(accountSetting)
          return value
        })
      )
      .then(
        value => {
          asyncLocalStorage.setItem('accounts', value)
            .then(
              () => {
                JSON.parse(localStorage.getItem('accounts')).pop().id === accountSetting.id ?
                  resolve(accountSetting) :
                  reject()
              }
            )
        }
      )
  })
}

const changeAccount = (accountSetting) => {
  let accounts = asyncLocalStorage.getItem('accounts')
  let idArray = getIDArray()
  let index = idArray.indexOf(accountSetting.id)

  return new Promise((resolve, reject) => {
    accounts
      .then(
        value => {
          value.splice(index, 1, accountSetting)
          return value
        }
      )
      .then(
        value => {
          asyncLocalStorage.setItem('accounts', value)
            .then(
              () => {
                asyncLocalStorage.getItem('accounts')[index] === accountSetting ?
                  resolve(accountSetting) :
                  reject()
              }
            )
        }
      )
  })
}

const removeAccount = (accountID) => {
  let accounts = asyncLocalStorage.getItem('accounts')
  let idArray = getIDArray()
  let index = idArray.indexOf(accountID)

  return new Promise((resolve, reject) => {
    accounts.then(
      value => {
        value.splice(index, 1)
        return value
      }
    )
      .then(
        value => {
          asyncLocalStorage.setItem('accounts', value)
            .then(
              () => {
                let index = getIDArray().indexOf(accountID)

                index === -1 ? resolve() : reject()
              }
            )
        }
      )
  })
}

const idCheck = (accountID) => {
  let idArray = getIDArray()
  let index = idArray.indexOf(accountID)

  return new Promise((resolve, reject) => {
    index === -1 ? resolve() : reject()
  })
}

//This account setting is Object
//id and password
const loginCheck = (accountSetting) => {
  let index = getIDArray().indexOf(accountSetting.id)
  let accounts = JSON.parse(localStorage.getItem('accounts'))

  return new Promise(function(resolve, reject) {
    if(index !== -1 || accounts[index].password === accountSetting.password)
      resolve(accounts[index])
    reject()
  })
}



//dataSetting is Object. id and data....
const addAccountData = (dataName, dataSetting) => {
  let data = asyncLocalStorage.getItem(dataName)

  return new Promise((resolve, reject) => {
    data
      .then(
        value => {
          value === null ? value = [] : {}
          let valueIndex = value.map(element => {
              return element.id
            }
          ).findIndex(
            value => {
              return value === dataSetting.id
          })

          valueIndex === -1 ? value.push(dataSetting)
            : value.splice(valueIndex, 1, dataSetting)

          return value
        }
      )
      .then(
        value => {
          console.log(value)
          asyncLocalStorage.setItem(dataName, value)
            .then(
              () => {
                JSON.parse(localStorage.getItem(dataName)).find(
                  value => {
                    return value.id === dataSetting.id
                  }
                ) ?
                  resolve(dataSetting) :
                  reject()
              }
            )
        }
      )
  })
}

const removeAccountData = (id, dataName) => {
  let data = asyncLocalStorage.getItem(dataName)

  return new Promise((resolve, reject) => {
    data.then(
      value => {
        if(value === null) {
          reject()
          return
        }
        else {
          let valueIndex = value.map(element => {
              return element.id
            }
          ).findIndex(id)

          if(valueIndex === -1) {
            reject()
            return
          }
          value.splice(valueIndex, 1)
        }

        return value
      }
    )
      .then(
        value => {
          if(!value) {
            return
          }
          asyncLocalStorage.setItem(dataName, value)
            .then(
              () => {
                let dataCheck = JSON.parse(localStorage.getItem(dataName))

                dataCheck.map(element => {
                    return element.id
                  })
                  .find(id) ?
                  reject() :
                  resolve()
              }
            )
        }
      )
  })
}

const loadAccountData = (id, dataName) => {
  let data = asyncLocalStorage.getItem(dataName)

  return new Promise( (resolve, reject) => {
    data.then(
      value => {
        if(value === null)
          reject

        let valueIndex = value.map(element => {
            return element.id
          }
        ).findIndex(id)

        valueIndex === -1 ? reject : resolve(value[valueIndex])
      }
    )
  })
}

export const register = {
  makeAccount,
  changeAccount,
  removeAccount,
  idCheck
}

export const login = {
  loginCheck
}

export const data = {
  addAccountData,
  removeAccountData,
  loadAccountData
}