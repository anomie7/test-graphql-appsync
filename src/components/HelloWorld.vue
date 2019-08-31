<template>
  <div class="hello">
    <button v-on:click="click">{{msg}}</button>
    <button @click="plus">plus</button>
  </div>
</template>

<script>
import listBlogs from "@/graphql/queryBlog";

export default {
  name: "HelloWorld",
  data() {
    return {
      limit: 1
    };
  },
  methods: {
    click() {
      this.listBlogs.items.forEach(element => {
        console.log(element.id);
      });
    },
    plus() {
      this.limit++;
    }
  },
  apollo: {
    listBlogs: {
      query: listBlogs,
      variables() {
        return {
          limit: this.limit
        };
      }
    }
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
