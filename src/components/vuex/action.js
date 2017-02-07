export const addTodos = function ({ dispatch, state },title) {
    dispatch('ADDTODOS', title)
}
export const finishTodo = function({ dispatch,state},index){
    dispatch('FINISHTODO', index)
}
export const removeTodo = function({ dispatch,state},index){
    dispatch('REMOVETODO', index)
}
export const deleteTodo = function({ dispatch,state},index){
    dispatch('DELETETODO', index)
}
export const unfinishTodo = function({ dispatch,state},index){
    dispatch('UNFINISHTODO', index)
}