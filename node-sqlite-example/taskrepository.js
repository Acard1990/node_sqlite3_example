class TaskRepository {  
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT,
          isComplete INTEGER DEFAULT 0,
          projectId INTEGER,
          CONSTRAINT tasks_fk_projectId FOREIGN KEY (projectId)
            REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE)`
      return this.dao.run(sql)
    }

    create(name, description, isComplete, projectId) {
        return this.dao.run(
          `INSERT INTO tasks (name, description, isComplete, projectId)
            VALUES (?, ?, ?, ?)`,
          [name, description, isComplete, projectId])
      }
      
      update(task) {
        const { id, name, description, isComplete, projectId } = task
        return this.dao.run(
          `UPDATE tasks
          SET name = ?,
            description = ?,
            isComplete = ?,
            projectId = ?
          WHERE id = ?`,
          [name, description, isComplete, projectId, id]
        )
      }

      delete(id) {
        return this.dao.run(
          `DELETE FROM tasks WHERE id = ?`,
          [id]
        )
      }
  }