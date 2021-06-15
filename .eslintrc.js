/* eslint-disable import/unambiguous,import/no-commonjs */
const incredible = require('eslint-config-incredible');

module.exports = {
    'root'          : true,
    'extends'       : [ ...incredible.extends ],
    'parser'        : '@typescript-eslint/parser',
    'parserOptions' : {
        'ecmaVersion' : 6,
        'sourceType'  : 'module'
    },
    'plugins' : [
        '@typescript-eslint'
    ],
    'rules' : {
        ...incredible.rules,

        '@typescript-eslint/naming-convention' : 0,
        '@typescript-eslint/semi'              : 'warn',
        'curly'                                : 'warn',
        'eqeqeq'                               : 'warn',
        // 'no-throw-literal'                     : 'warn',
        'import/no-unresolved'                 : 0, // not works with ts?

        'no-unused-vars'                    : 0,
        '@typescript-eslint/no-unused-vars' : 'error'

    },
    'ignorePatterns' : [
        '**/*.d.ts'
    ],
    'overrides' : [
        ...incredible.overrides
    ]
};
