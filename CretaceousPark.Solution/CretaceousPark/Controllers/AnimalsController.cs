using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using CretaceousPark.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace CretaceousPark.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AnimalsController : ControllerBase
  {
    private CretaceousParkContext _db;

    public AnimalsController(CretaceousParkContext db)
    {
      _db = db;
    }

    // GET api/animals
    // [HttpGet]
    // public ActionResult<IEnumerable<Animal>> Get()
    // {
    //   return _db.Animals.ToList();
    // }

    // GET api/animals
    [HttpGet]
    public ActionResult<List<Animal>> Get(string species, string gender, string name)
    {
        IQueryable<Animal> query = _db.Animals.AsQueryable();

        if (species != null)
        {
        query = query.Where(entry => entry.Species == species);
        }

        if (gender != null)
        {
        query = query.Where(entry => entry.Gender == gender);
        }

        if (name != null)
        {
        query = query.Where(entry => entry.Name == name);
        }

        return query.ToList();
    }

    // POST api/animals
    [EnableCors("MyPolicy")]
    [HttpPost]
    public void Post([FromBody] Animal animal)
    {
      _db.Animals.Add(animal);
      _db.SaveChanges();
    }

    // GET api/animals/5
    [HttpGet("{id}")]
    public ActionResult<Animal> Get(int id)
    {
        return _db.Animals.FirstOrDefault(entry => entry.AnimalId == id);
    }

    // PUT api/animals/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] Animal animal)
    {
        animal.AnimalId = id;
        _db.Entry(animal).State = EntityState.Modified;
        _db.SaveChanges();
    }

    // DELETE api/animals/5
    [HttpDelete("{id}")]
    public ActionResult<List<Animal>> Delete(int id)
    {
      var animalToDelete = _db.Animals.FirstOrDefault(entry => entry.AnimalId == id);
      _db.Animals.Remove(animalToDelete);
      _db.SaveChanges();
      return _db.Animals.ToList();
    }
  }
}