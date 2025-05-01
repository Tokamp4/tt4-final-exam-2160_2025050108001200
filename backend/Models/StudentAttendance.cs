namespace Backend.Models
{
    public class StudentAttendance
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public DateTime Date { get; set; }
        public bool Present { get; set; }
        public string? Remarks { get; set; }
    }
}