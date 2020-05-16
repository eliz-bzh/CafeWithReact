﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Cafe.Models.DBModels;
using Cafe.Services.DBServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cafe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishController : Controller
    {
        public DBDishService service;

        public DishController(DBDishService service)
        {
            this.service = service;
        }

        [HttpGet("create")]
        //[FromBody]
        public bool Create(Dish dish)
        {
            return service.Create(dish);
        }

        [HttpGet("edit")]
        //[FromBody]
        public bool Update(Dish dish)
        {
            return service.Update(dish);
        }

        [HttpGet("getById/{id}")]
        public Dish GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpGet("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpGet("getAll")]
        public IList<Dish> GetAll()
        {
            return service.GetAll();
        }
    }
}