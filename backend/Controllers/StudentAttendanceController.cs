namespace Backend.Controllers
{
    using Backend.Data;
    using Backend.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [ApiController]
    [Route("/[controller]")]
    public class StudentAttendanceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentAttendanceController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentAttendance>>> GetAttendances()
        {
            return await _context.StudentAttendances.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StudentAttendance>> GetAttendance(int id)
        {
            var task = await _context.StudentAttendances.FindAsync(id);
            if (task == null) return NotFound();
            return task;
        }

        [HttpPost]
        public async Task<ActionResult<StudentAttendance>> CreateAttendance(StudentAttendance attendance)
        {
            _context.StudentAttendances.Add(attendance);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAttendance), new { id = attendance.Id }, attendance);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAttendance(int id, StudentAttendance attendance)
        {
            if (id != attendance.Id) return BadRequest();

            _context.Entry(attendance).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttendance(int id)
        {
            var task = await _context.StudentAttendances.FindAsync(id);
            if (task == null) return NotFound();

            _context.StudentAttendances.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}