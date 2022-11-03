import styles from '../css/input.module.css'

type FormInput = {
  title: string
  weekday: string
  weekId: number
  completed: 'on' | 'off'
}

export const CreateTask = () => {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const input = [...formData.entries()].map((row) => {
      return {
        [row[0]]: row[1]
      }
    })

    const obj = [...formData.entries()].reduce((acc, [key, val]) => {
      return Object.assign(acc, { [key]: val })
    }, {} as FormInput)

    try {
      const response = await fetch('http://localhost:3000/api/task', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...obj, completed: obj.completed === 'on' })
      })
      const json = await response.json()
      console.log(json)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.container}>
        <div className={styles.inputItem}>
          <label>Title</label>
          <input name="title" type="text" />
        </div>
        <div className={styles.inputItem}>
          <label>Weekday</label>
          <input name="weekday" type="text" />
        </div>
        <div className={styles.inputItem}>
          <label>Week</label>
          <input name="weekId" type="number" />
        </div>
        <div className={styles.inputItem}>
          <label>Completed</label>
          <input name="completed" type="checkbox" />
        </div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  )
}
