import readlineSync from "readline-sync"
// import ansi from "ansi"

// export const usePrompt = (text, cb) => {
//   const cursor = ansi(process.stdout)

//   process.stdin.setRawMode(true)
//   process.stdin.resume()
//   process.stdin.setEncoding("utf8")

//   return new Promise((res) => {
//     text && cursor.write(text).reset()

//     process.stdin.on("data", (key) => {
//       cursor.write(key).reset()

//       if (key === "ы") {
//         cursor.write("\nExit\n").reset()
//         res()
//       } else {
//         cb(key)
//       }
//     })
//   })
// }

export const usePrompt = async (prompt, cb) => {
  const input = readlineSync.question(prompt)

  return await cb(input)
}
