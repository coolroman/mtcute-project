import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

function add(a: number, b: number) {
  return a + b;
}

Deno.test(function addTest() {
  assertEquals(add(2, 3), 5);
});
