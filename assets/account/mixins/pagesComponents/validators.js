export const countMasterOfferValidators = {
    data: () => ({
        rules: {
            checkForLetters: (v) => {
                if (typeof v !== 'undefined'  && window.macrosParam) {
                    if (typeof v === 'object') return 'Required'
                    let res = v.replace(/\{.+?\}/ig, '')
                    // let matchLetters = res.match(/[a-zа-я]/ig)
                    // if (matchLetters) {
                    //     return 'You can enter alphabetic characters only as macros.'
                    // }
                }
                return false
            },
            checkForInvalidCharacters: (v) => {
                if (typeof v !== 'undefined'  && window.macrosParam) {
                    if (typeof v === 'object') return 'Required'
                    let res = v.match(/(?<!\&)\&(?!\&)|(?<!\|)\|(?!\|)|\$|\[|\]/g)
                    if (res) {
                        return 'You used invalid characters'
                    }
                }
                return false
            },
            compareGetParam: (v) => {
                if (typeof v !== 'undefined'  && window.macrosParam) {
                    if (typeof v === 'object') return 'Required'
                    let res = v.match(/\{.+?\}/ig)
                    if (res) {
                        return (res.every(elem => {
                            elem = elem.slice(1, -1)
                            return window.macrosParam.some(item => {
                                return item === elem
                            })
                        })) ? true : 'Not compare with macros. Existing macros(_ instead space): ' + window.macrosParam;
                    }
                    return 'required field'
                }
                return false
            },
        }
    })
}

export const commonValidators = {
    data: () => ({
        valid: '',
        rules: {
            required: value => {
                // return !!value || 'Required field.'
                return !!value ? !!value.trim() : 'Required'
            },
            checkSelect: value => {
                return !!value || 'Required'
            },
            checkSelectIfObjectReturns: value => {
                if (typeof value === 'object' && Object.keys(value).length === 0) {
                    return 'Required'
                }
                return _.values(value).some(elem => typeof elem === 'undefined' || !elem || false == elem)
                ? 'Required'
                : true
            }
        }
    })
}