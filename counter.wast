(module
  (type $FUNCSIG$vi (func (param i32)))
  (import "env" "STACKTOP" (global $STACKTOP$asm2wasm$import i32))
  (import "env" "__Z3logPc" (func $__Z3logPc (param i32)))
  (import "env" "memory" (memory $0 256 256))
  (import "env" "table" (table 0 0 anyfunc))
  (import "env" "memoryBase" (global $memoryBase i32))
  (import "env" "tableBase" (global $tableBase i32))
  (data (i32.const 1024) "count")
  (global $STACKTOP (mut i32) (get_global $STACKTOP$asm2wasm$import))
  (global $f0 (mut f32) (f32.const 0))
  (export "counter" (func $counter))
  (func $counter (result i32)
    (local $$0 i32)
    (local $$1 i32)
    (local $label i32)
    (local $sp i32)
    (set_local $sp
      (get_global $STACKTOP)
    )
    (call $__Z3logPc
      (i32.const 1024)
    )
    (set_local $$0
      (i32.load
        (i32.const 1032)
      )
    )
    (set_local $$1
      (i32.add
        (get_local $$0)
        (i32.const 1)
      )
    )
    (i32.store
      (i32.const 1032)
      (get_local $$1)
    )
    (return
      (get_local $$0)
    )
  )
)
