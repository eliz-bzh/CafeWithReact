﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cafe.Models.DBModels;
using Cafe.Services.DBServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cafe.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowMyOrigin")]
    public class OrderController : Controller
    {
        private readonly DBOrderService service;

        public OrderController(DBOrderService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create(Order order)
        {
            return service.Create(order);
        }

        [HttpPut("update")]
        //[FromBody]
        public bool Update(Order order)
        {
            return service.Update(order);
        }

        [HttpGet("getById/{id}")]
        public Order GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpGet("getAll")]
        public IList<Order> GetAll()
        {
            return service.GetAll();
        }
    }
}