using System.Linq.Expressions;

namespace Versta.TestTask.Common;

public interface IReadOnlyRepository<TEntity>
    where TEntity : IEntity
{
    IQueryable<TEntity> GetAll();
    IQueryable<TEntity> FindAll(Expression<Func<TEntity, bool>> predicate);
    Task<TEntity> GetAsync(long id, CancellationToken token);
    Task<TEntity> FindAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken token);
}