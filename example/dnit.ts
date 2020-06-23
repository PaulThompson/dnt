import { task, exec, file } from "https://raw.githubusercontent.com/PaulThompson/dnt/main/dnt.ts";
import {delay} from "https://deno.land/std/async/delay.ts";
import * as log from "https://deno.land/std/log/mod.ts";
import * as fs  from "https://deno.land/std/fs/mod.ts";

const foo = file({
  path: './foo.txt'
});

const helloWorld = task({
  name: 'helloWorld',
  description: "foo",
  actions: [
    async () => {
      console.log("hello world");
      await fs.writeFileStr(foo.path, "fooxoaa");
    },
  ],
  /*file_deps: [
    file({
      path: "./dnit.ts"   // any files generated by this script should depend on it
    })
  ],*/
  targets: [
    foo
  ],
  uptodate: ()=>false
});

const helloWorld2 = task({
  name: 'helloWorld2',
  actions: [
    async () => {
      console.log("hello world222");
      await delay(1000);
      console.log("hello world222 done");
    },
  ],
  file_deps: [
    foo
  ],
  uptodate: ()=>true
});

const helloWorld3 = task({
  name: 'helloWorld3',
  actions: [
    async () => {
      console.log("hello world333");
      await delay(1000);
      console.log("hello world333 done");
    },
  ],
  uptodate: ()=>false
});

const goodBye = task({
  name: 'goodbye',
  actions: [
    async () => {
      console.log("good world");
    },
    async () => {
      console.log("bye world");
    },
  ],
  task_deps: [helloWorld, helloWorld, helloWorld, helloWorld2, helloWorld3, helloWorld]
})

exec(Deno.args);