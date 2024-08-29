<template>
  
</template>

<script>
export default {
    name: 'logout',
    mounted:function()
    {
        this.$socket.emit('CloseSession', JSON.parse(localStorage.getItem('user')))
    }
}
</script>