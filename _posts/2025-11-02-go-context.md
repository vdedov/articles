---
title: Управление временем жизни задач в Go с context
date: 2025-11-02
categories: [Go, Concurrency]
tags: [go, context, timeout]
---

В Go пакет `context` помогает ограничить время выполнения и отменять операции.

```go
package main

import (
  "context"
  "fmt"
  "time"
)

func main() {
  ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
  defer cancel()

  done := make(chan struct{})
  go func() {
    time.Sleep(1500 * time.Millisecond)
    fmt.Println("work done")
    close(done)
  }()

  select {
  case <-done:
    fmt.Println("ok")
  case <-ctx.Done():
```
    fmt.Println("timeout:", ctx.Err())
  }
}
